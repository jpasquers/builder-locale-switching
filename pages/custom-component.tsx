import { Builder } from '@builder.io/react';

export const CategoriesDirectory = () => {
    console.log(`Categories Directory component rendered`);
    return <div>Categories Directory</div>;
};

export const CategoriesDictoryConfig = {
    name: 'Categories Directory',
};

Builder.registerComponent(CategoriesDirectory, CategoriesDictoryConfig);
