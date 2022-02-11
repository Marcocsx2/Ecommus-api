const messages = (param: string, resource?: string, language?: string) => {
  const content = {
    CREATE: {
      es: `${resource} registrado correctamente`,
      en: `${resource} registered correctly`,
    },
    UPDATE: {
      es: `${resource} actualizado correctamente`,
      en: `${resource} updated correctly`,
    },
    DELETE: {
      es: `${resource} eliminado correctamente`,
      en: `${resource} deleted correctly`,
    },
    GET: {
      es: `${resource} encontrado`,
      en: `${resource} found`,
    },
    GET_ALL: {
      es: `${resource} encontrados`,
      en: `${resource} found `,
    },
    OK: {
      es: "Operación exitosa",
      en: "Operation successfully completed",
    },
    WITHOUT_RESULTS: {
      es: `Sin resultados`,
      en: `Without Resuts`,
    },
    UNAUTHORIZED: {
      es: `Usuario no autorizado`,
      en: `User Unauthorized`,
    },
    ERROR_CONTROLLER: {
      es: `Error en controller ${resource}`,
      en: `Error in controller ${resource}`,
    },
    EMAIL_EXIST: {
      es: `El correo ${resource} ya existe en la plataforma`,
      en: `The email ${resource} already exists on the platform`,
    },
    EMAIL_WITH_SIMPLE_AUTH: {
      es: `El correo ${resource} ya existe con la autenticación simple`,
      en: `The email ${resource} already exists with simple authentication`,
    },
    EMAIL_INCORRECT: {
      es: "(Correo) o contraseña incorrectos.",
      en: "Incorrect (Email) or password.",
    },
    CHECK_EMAIL: {
      es: `El correo que quiere iniciar sesion no esta aun verificado, porfavor chequea tu correo crack`,
      en: `The email you want to login with is not yet verified, please check your email crack`,
    },
    PASSWORD_INCORRECT: {
      es: "Correo o (contraseña) incorrectos.",
      en: "Incorrect Email or (password.)",
    },
    LOGIN_SUCCESS: {
      es: `Bienvenido ${resource}`,
      en: `Welcome ${resource}`,
    },
    VALIDATION_SUCCESS: {
      es: `Correo validado correctamente`,
      en: `Email validated correctly`,
    },
    ERROR_CODE_VALIDATION: {
      es: `EL codigo es incorrecto o ya no es valido`,
      en: `The code is incorrect or is no longer valid`,
    },
    SUCCESS_CODE_VALIDATION: {
      es: `Usuario validado correctamente`,
      en: `User validated successfully`,
    },
    FIELDS_NEEDED: {
      es: `El campo de ${resource} es necesario`,
      en: `${resource} field is necessary`,
    },

    TOKEN_EXPIRED: {
      es: `El token invalido o expirado`,
      en: `The token invalid or has expired`,
    },

    INSUFFICIENT_PERMISSIONS: {
      es: `Permisos insuficientes para acceder a este recurso`,
      en: `Insufficient permissions to access this resource`,
    },

    NO_RESOURCES: {
      es: `El recurso no existe`,
      en: `The resource doesn't exist`,
    },
    // Recover password:

    EMAIL_NOT_MATCHECKED: {
      es: `El correo no coincide con ningun usuario en la plataforma`,
      en: `The email does not match any user on the platform`,
    },

    EMAIL_SIGNED_GOOGLE: {
      es: `Correo usa el metodo de autenticación con google, solo se puede cambiar la contraseña con autenticación simple`,
      en: `Mail uses the authentication method with google, you can only change the password with simple authentication`,
    },

    EMAIL_TO_CHANGE_PASSWORD_SUCCESS: {
      es: `Para recuperar su contraseña, ingrese al enlace enviado a su correo.`,
      en: `To recover your password, Enter the link sent to your email`,
    },

    FOLLOWING: {
      es: `Estas siguiendo a este usuario`,
      en: `You are following this user`,
    },

    ALREADY_FOLLOWED: {
      es: `Ya estas siguiendo a este usuario`,
      en: `You are already following this user`,
    },

    CANT_FOLLOW_YOURSELF: {
      es: `No puedes seguir a tu mismo usario`,
      en: `You can't follow yourself`,
    },

    NOT_PRODUCT: {
      es: "No se encontro el producto",
      en: "Product not found",
    },

    REVIEW_ADDED: {
      es: "Reseña agregada",
      en: "Review added",
    },

    ALREADY_REVIEWED: {
      es: "El producto ya tiene una reseña tuya",
      en: "Product already reviewed",
    },

    USER_UNDEFINED: {
      es: `El usuario indefinido`,
      en: `User undefined`,
    },

    ERROR_USER_NOT_FOUND: {
      es: `EL usuario no encontrado`,
      en: `User not found`,
    },

    EXIST_SUBCATEGORY: {
      es: "La subcategoria ya existe en esta categoria",
      en: "Subcategory already exists in this category",
    },
    IMAGE_REQUIRED: {
      es: `La imagen es requerida`,
      en: "the photo is required",
    },
    PRODUCT_ADDED: {
      es: `Producto añadido correctamente`,
      en: `Product added successfully`,
    },
    EXIST_PRODUCTS_WAREHOUSE: {
      es: `No se puede eliminar el almacen porque aun existen productos`,
      en: `You cannot delete the warehouse because there are still products`,
    },
    ORDER_NOT_EXIST: {
      es: `La orden no existe`,
      en: `The order doesn't exist`,
    },
    ORDER_USED: {
      es: `La orden ya esta siendo utilizado`,
      en: `The order is already being used`,
    },
    FAILED_PAYMENT: {
      es: `El proceso de compra no se concreto, por favor intertar mas luego`,
      en: `The purchase process was not specified, please try again later`,
    },

    POST_NOT_FOUND: {
      es: "Publicación no encontrado",
      en: "Post not found",
    },

    PRODUCT_NOT_FOUND: {
      es: "Producto no encontrado",
      en: "Product not found",
    },

    COMMENT_ADDED: {
      es: "Comentario Agregado",
      en: "Comment Added",
    },
  };

  return content[param][language];
};

export default messages;
