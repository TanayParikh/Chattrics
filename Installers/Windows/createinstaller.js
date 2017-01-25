const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'Release')

    return Promise.resolve({
       appDirectory: path.join(outPath, 'Chattrics-win32-x64/'),
       authors: 'Tanay Parikh & Chris Hilts',
       noMsi: true,
       outputDirectory: path.join(outPath, 'windows-installer'),
       exe: 'Chattrics.exe',
       setupExe: 'ChattricsAppInstaller.exe',
       setupIcon: path.join(rootPath, 'app', 'icons', 'win', 'app_icon.ico')
   })
}
