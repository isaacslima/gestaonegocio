# gestaonegocio

Web app to manage clients, services, receipts and outgoings.

Product Backlog.

Dashboard to show number of clientes, next birthdays clients of 30 days, provisioning of receipts and outgoings of the months.

![Image](/dashboard.png)

Menu like drawer who user navigate to the functionalities

![Image](/menu.png)


CRUD Clients

CRUD Services

CRUD Receipts

CRUD Outgoings

CRU User and permissions.

Configure your firebase settings on firebase folder, create an index.js like the code below
<pre>
import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'your-api-key',
  authDomain: 'your-auth-doamin',
  databaseURL: 'your-databaseUrl',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
});

export const db = app.database();
export const clientesRef = db.ref('clientes');
export const usuariosRef = db.ref('usuarios');
export const servicosRef = db.ref('servicos');
export const entradasRef = db.ref('entradas');
export const saidasRef = db.ref('saidas');
</pre>
