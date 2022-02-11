export const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="display: flex; justify-content: center; align-items: center;">
        <div
            style="padding: 30px; box-shadow: 2px 2px 10px #dedede; text-align: center; width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div>
                <!-- <img src="./images/logo.png" alt="logo" style="width: 100px; height: 100px;"> -->
                <h2 style="margin: 0; margin-bottom: 10px; color: #45A69B;"> EcommUs </h2>
            </div>
            <h5 style="font-size: 20px; margin: 0;">Recuperar contraseña</h5>
            <p style="margin-bottom: 30px;">Por favor para cambiar de contraseña dale click al botón.</p>
            <a href="{recoverPasswordLink}" style="padding: 10px; width: 100%; background-color: #45A69B; border: none; color: #fff; font-weight: bold; border-radius: 5px; text-decoration: none; margin-top: 20px;">Recuperar Contraseña</a>
            <p style="margin-top: 30px">O pega este link en el navegador:</p>
            <div>
                <a href="{linkOriginal}">{textPassword}</a>
            </div>
                
        </div>
    </div>
</body>

</html>`