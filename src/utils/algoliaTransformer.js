const algoliaTransformer = ({data: { products } }) =>

    products.nodes.map(({ images, variants, ...rest }) => {
            
            return{
                images: images.map((image) => { return(image.localFile.childImageSharp.gatsbyImageData)}),
                price: variants.map((variant) => { return(variant.price)}),
                sku: variants.map((variant) => { return(variant.sku)}),
            ...rest
            };
        }
        
    );

    module.exports = algoliaTransformer;
