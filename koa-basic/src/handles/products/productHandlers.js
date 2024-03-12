const { getListProducts, getProductById, createProduct, updateProduct, deleteProduct, getAllProducts } = require( "../../database/productRepository" );

const getProducts = async ( ctx ) => {
  try {
    const { limit, sort } = ctx.query;
    if ( limit, sort ) {
      const products = getListProducts( +limit, sort );
      return ctx.body = {
        data: products
      }
    } else {
      const products = getAllProducts();
      await ctx.render( "pages/products", { products } );
    }

  } catch ( e ) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}

const getProduct = async ( ctx ) => {
  try {
    const { id } = ctx.params;
    const product = getProductById( +id );
    if ( product ) {
      await ctx.render( "pages/product", { product } );
    }
  } catch ( e ) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const createAProduct = async ( ctx ) => {
  try {
    const rawData = ctx.request.body;
    createProduct( rawData );

    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const updateCurrentProduct = async ( ctx ) => {
  try {
    const rawData = ctx.request.body;
    const { id } = ctx.params;
    updateProduct( +id, rawData );

    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const deleteAProduct = async ( ctx ) => {
  try {
    const { id } = ctx.params;
    deleteProduct( +id );
    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

module.exports = { getProduct, getProducts, createAProduct, updateCurrentProduct, deleteAProduct };
