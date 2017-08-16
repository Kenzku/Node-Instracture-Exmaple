**quick start:**

`npm start` - this will start in cluster mode based on your cores, if you have 4 cores CPU, 4 workers will listen to
port 3000 by default, workload will be distributed by master process via Round-Robin strategy. 
You do not need to build the project, or restart the server, if you change client code.

**slow start:**

`npm start -- port=3005 cluster=false` - this will start single process mode.

`npm run start:pm2` - start server with the pm2 process management tool with each worker using each core. The result is
the same as running `npm start`.

`npm run stop:pm2` - stop all processes of the above command.

`npm run start:pm2:prod` - [**PRODUCTION**] start server the pm2 process management tool in production mode. The difference between
production mode and dev mode is, production mode reads files from `dist` folder.

`npm run monitor` - monitor node cluster process.

Unless you are in single thread mode or master process is killed, workers will be re-spawned if dead.

`npm run start:prod` - [**PRODUCTION**] start the server in cluster mode, client files will be read from `dist` folder.

**Build**

`npm run prod` - [**DEV/PRODUCTION**] this will created `dist` folder which includes production client distributable files.

`npm run build` - [**PRODUCTION**] this will do the above command, plus will produce a zip file containing a Node version for x64 Linux.
use ./start command after unzip. 