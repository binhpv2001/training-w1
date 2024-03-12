const fs = require( 'fs' );
const { data: products } = require( './products.json' );


/**
 * @returns {[{name: string, price: number,description: string,product: string,color: string,createdAt: string, image: string,  id: number}]}
 */
const getListProducts = ( litmit, sort ) => {
  if ( sort === 'asc' ) {
    products.sort( ( a, b ) => new Date( a.createdAt ) - new Date( b.createdAt ) );
  }
  if ( sort === 'des' ) {
    products.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) );
  }
  const result = products.slice( 0, litmit );
  return result
}

const getAllProducts = () => {
  return products;
}
/**
 * @param id
 * @returns {[{name: string, price: number,description: string,product: string,color: string,createdAt: string, image: string,  id: number}]}
 */
const getProductById = ( id ) => {
  return products.find( product => product.id === id );
}

/**
 * @param data
 */
const createProduct = ( data ) => {
  const result = [ data, ...products ];
  return fs.writeFileSync( './src/database/products.json', JSON.stringify( {
    data: result
  } ) );
}

const updateProduct = ( id, data ) => {
  const updatedData = products.map( product => {
    if ( product.id === id ) {
      return { ...product, ...data };
    } else {
      return product;
    };
  } );
  fs.writeFileSync( './src/database/products.json', JSON.stringify( { data: updatedData }, null, 2 ) );
}

const deleteProduct = ( id ) => {
  const deletedProduct = products.filter( item => item.id !== id );
  fs.writeFileSync( './src/database/products.json', JSON.stringify( { data: deletedProduct }, null, 2 ) );
}

module.exports = {
  getProductById,
  getListProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
