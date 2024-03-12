const Router = require( 'koa-router' );
const bookHandler = require( '../handles/books/bookHandlers' );
const bookInputMiddleware = require( '../middleware/bookInputMiddleware' );
const productInputMiddleware = require( '../middleware/productInputMiddleware' );
import productHandler from '../handles/products/productHandlers';

// Prefix all routes with /books
const router = new Router();

router.get( '/products', productHandler.getProducts );
router.get( '/product/:id', productHandler.getProduct );

// Routes will go here
router.get( '/api/books', bookHandler.getBooks );
router.get( '/api/books/:id', bookHandler.getBook );
router.post( '/api/books', bookInputMiddleware, bookHandler.save );

//Product routes

router.get( '/api/products', productHandler.getProducts );
router.get( '/api/product/:id', productHandler.getProduct );
router.post( '/api/products', productInputMiddleware.createProductDto, productHandler.createAProduct );
router.put( '/api/product/:id', productInputMiddleware.updateProductDto, productHandler.updateCurrentProduct );
router.delete( '/api/product/:id', productHandler.deleteAProduct )


module.exports = router;
