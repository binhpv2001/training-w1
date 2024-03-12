const yup = require( 'yup' );

const createProductDto = async ( ctx, next ) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape( {
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      price: yup.number().positive().integer().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      createdAt: yup.datetime( 'Date format is incorrect ' ).required(),
      image: yup.string().required()
    } );

    await schema.validate( postData );
    next();
  } catch ( e ) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

const updateProductDto = async ( ctx, next ) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape( {
      name: yup.string(),
      price: yup.number().positive().integer(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      createdAt: yup.datetime( 'Date format is incorrect ' ),
      image: yup.string()
    } );

    await schema.validate( postData );
    next();
  } catch ( e ) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

module.exports = { createProductDto, updateProductDto };
