"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
exports.html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="display: flex; justify-content: center; align-items: center;">
        <div style="padding: 30px; box-shadow: 2px 2px 10px #dedede; text-align: center; width: 400px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" >
            <div >
                <!-- <img src="./images/logo.png" alt="logo" style="width: 100px; height: 100px;"> -->
                <h2 style="margin: 0; margin-bottom: 10px; color: #45A69B;"> {name} </h2>
            </div>
            <h5 style="font-size: 20px; margin: 0;">Verifica tu correo electrónico {code} </h5>
            <p>Por favor confirma que quieres usar este correo para Aluka.Sé parte de nuestra familia!</p>
            <button style="padding: 15px; width: 100%; background-color: #45A69B; border: none; color: #fff; font-weight: bold; border-radius: 5px;">Verificar email</button>
            <p>O pega este link en el navegador:</p>
            <a href="#">link</a>
        </div>
    </div>
</body>

</html>`;
//# sourceMappingURL=sendConfirmationEmail.html.js.map