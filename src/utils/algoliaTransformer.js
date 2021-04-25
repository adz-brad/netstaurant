const algoliaTransformer = ({data: { products } }) =>

    products.nodes.map(({ images, variants, ...rest }) => {
            
            return{
                images: images.map((image) => image.localFile.childImageSharp.gatsbyImageData),
                price: variants.map((variant) => parseInt(variant.price, 10)),
                sku: variants.map((variant) => variant.sku).toString(),
            ...rest
            };
        }
        
    );

    module.exports = algoliaTransformer;
