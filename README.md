# COPEREX
Esta API está diseñada para gestionar la incorporación de nuevos socios y empresas a su famosa feria “Interfer”. Para ello, se requiere la creación de una API robusta utilizando Node.js, Express y MongoDB.

Para esta API a excepción del Login, Se requiere un token que valide las funciones, aunque de no llevarlo en la solicitud se enviará un mensaje del error
- **Credenciales de Admin**
    - **Cuerpo:**
    ```json
    {
      "username": "admin1",
      "password":"admin123"
    }
    ```

    