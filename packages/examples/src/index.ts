import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp } from '@foal/core';
import * as sqliteStoreFactory from 'connect-sqlite3';
import { createConnection } from 'typeorm';

// App
import { AppController } from './app/app.controller';

async function main() {
  await createConnection();

  const app = createApp(AppController, {
    store: session => new (sqliteStoreFactory(session))({ db: 'test_db.sqlite' }),
  });

  const httpServer = http.createServer(app);
  const port = Config.get('port', 3000);
  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

main();
