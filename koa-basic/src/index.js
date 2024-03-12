const Koa = require( 'koa' );
const app = new Koa();
const render = require( "koa-ejs" );
// import generateFakeData from './dataFaker';
const koaBody = require( 'koa-body' );
const router = require( './routes/routes' );
const path = require( 'path' );

render( app, {
  root: path.join( __dirname, "views" ),
  layout: "layout/layout",
  viewExt: "html",
  cache: false,
  debug: true,
} );

// generateFakeData( 1000, './src/database/products.json' )
app.use( koaBody() );
app.use( router.routes() );
app.use( router.allowedMethods() );

app.listen( 5000 );
