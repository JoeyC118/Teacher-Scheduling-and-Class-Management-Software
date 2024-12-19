const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer to the renderer process through the preload script
contextBridge.exposeInMainWorld('electronAPI', {
  sendTeacherData: (teacherData) => ipcRenderer.send('teacher-data', teacherData),
  loadTeachers: () => ipcRenderer.send('teacher-logs-load'),
  getTeacherLogs: (callback) => ipcRenderer.on('teacherlogs:get',callback),


  
  sendClassData: (classList) => ipcRenderer.send('class-list', classList),
  loadClasses: () => ipcRenderer.send('class-list-load'), 
  getClassData: (callback) => ipcRenderer.on('classlist:get', callback),


  sendUpdatedClass:(teacherID, updatedSchedule) => ipcRenderer.send('update-teacher-schedule',{teacherID, schedule:updatedSchedule}),
  
  deleteLog: (databaseName, itemId) => ipcRenderer.send('deleteLog', databaseName, itemId)


});