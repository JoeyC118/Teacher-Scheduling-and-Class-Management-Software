const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const connectDB = require("./config/db");
const teachers = require("./models/teachers");
const classes = require("./models/classes")

connectDB();
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("teacher-logs-load", sendTeacherLogs);
ipcMain.on("class-list-load", sendClassList);

async function sendTeacherLogs() {
  try {
    const teacherlogs = await teachers.find().sort({ created: 1 });
    mainWindow.webContents.send("teacherlogs:get", JSON.stringify(teacherlogs));
  } catch (err) {
    console.log(err);
  }
}

ipcMain.on("teacher-data", async (e, item) => {
  try {
    await teachers.create(item);
    sendTeacherLogs();
  } catch (err) {
    console.log(err);
  }
});

async function sendClassList() {
  try {
    const classLogs = await classes.find().sort({ created: 1 });
    mainWindow.webContents.send("classlist:get", JSON.stringify(classLogs));
  } catch (err) {
    console.log(err);
  }
}

ipcMain.on("class-list", async (e, item) => {
  try {
    await classes.create(item);
    sendClassList();
  } catch (err) {
    console.log(err);
  }
});


ipcMain.on('update-teacher-schedule',async (e, item) =>{

  try {
    const { teacherID, schedule } = item; 

    console.log("Received update-teacher-schedule event");
    console.log("Teacher ID:", teacherID);
    console.log("Schedule:", schedule);

    
    await teachers.updateOne(

      {_id: teacherID},
      {$set: {schedule}}
    )
  }
  catch {
    console.log("Error",err);
  }

})

ipcMain.on('deleteLog', async (e, name, id) => {
  try {
    let result;
    switch (name) {
      case 'classes':
        await classes.findOneAndDelete({_id:id})
        sendClassList()
        break;
      case 'teachers':
        await teachers.findOneAndDelete({_id:id})
        sendTeacherLogs()
        break;
      default:
        throw new Error('Unknown database');
    }

    e.sender.send('deleteLogResponse', { success: true, message: 'Log deleted successfully', result });
  } catch (err) {
    console.log(err)
  }
})