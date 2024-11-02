# Proyecto Store Back
Permite la gestión de tiendas en linea, para la gestión de inventario o ventas.

# Requisitos
Node.js
PostgreSQL
Docker (Opcional)

# Instalación
1) Clonar Proyecto
```bash
git clone <<url_proyecto>> 
```

2) Instalar Dependencias
```bash
npm install
```

3) Correr migraciones de PostgreSQL
- Levantar BD en Docker (Opcional)
```bash
docker-compose up -d
```

- Deployar proyecto localmente
```bash
npm run build
```

- Correr migraciones en la BD
```bash
npx typeorm migration:run --dataSource dist/database/datasource.js
```

4) Levantar proyecto
```bash
npm start
```