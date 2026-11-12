# Yapei

Sitio público para heladería y cafetería creado con ASP.NET Core Razor Pages (.NET 10). Incluye catálogo de seis lattes, selección de tamaño y carrito, envío de pedidos/reservas/contactos a WhatsApp, selector de idioma ES/EN y un panel administrativo de demostración.

## Estructura

```text
Pages/
  Index.cshtml             Página de inicio, catálogo, formularios y diálogos
  Shared/_Layout.cshtml    Navegación, metadatos y pie
wwwroot/
  css/site.css             Estilos adaptables
  js/site.js               Catálogo, carrito, idioma y WhatsApp
Program.cs
WebYapei.csproj
```

## Ejecutar localmente

1. Instala el SDK de .NET 10.
2. En la carpeta del proyecto ejecuta `dotnet run`.
3. Abre la dirección local que indique la consola (normalmente `https://localhost:xxxx`).

## Configuración necesaria antes de vender

- En `wwwroot/js/site.js`, reemplaza `WHATSAPP_NUMBER` por el número del dueño, solo dígitos y con código de país. Para Bolivia empieza con `591`; por ejemplo `591XXXXXXXX`.
- El panel de administración es una maqueta local con contraseña demostrativa (`yapei2026`). No es una protección real: no publiques el acceso como administrador ni introduzcas datos reales hasta implementar autenticación y persistencia en el servidor.
- Las imágenes y fuentes se cargan desde Unsplash y Google Fonts, por lo que requieren conexión a Internet. Antes de producción revisa licencias y disponibilidad de cada recurso.

## Publicación gratuita

La app necesita un host compatible con ASP.NET Core/.NET 10; GitHub Pages y Netlify no ejecutan Razor Pages directamente. Una opción es publicar el proyecto en un servicio con nivel gratuito que soporte aplicaciones .NET, o desplegarlo en un servidor gratuito compatible. En Visual Studio también puedes usar **Publish** para generar el artefacto y luego subirlo al host elegido. Revisa los límites y condiciones vigentes del proveedor antes de publicar.
