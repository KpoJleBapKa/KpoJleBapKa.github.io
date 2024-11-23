import { Article } from './models/Article';
import { Product } from './models/Product';
import { articleValidator } from './validation/ArticleValidator';
import { productValidator } from './validation/ProductValidator';
import { CompositeValidator } from './validation/CompositeValidator';
import { ContentOperations } from './interfaces/ContentOperations';
import { Versioned } from './versioning/Versioned';

const newArticle: Article = { // створення статті
  id: '1',
  title: 'Basic C++',
  content: 'An introduction to C++.',
  author: 'Michael Dawson',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft'
};

const articleValidationResult = articleValidator.validate(newArticle); // валідація статті
if (articleValidationResult.isValid) {
  console.log('Article is valid.');
} else {
  console.error('Article validation errors:', articleValidationResult.errors);
}

const newProduct: Product = { // створення продукту
  id: '1',
  name: 'Beginning C++ Through Game Programming',
  description: 'A book about C++.',
  price: 39.99,
  stock: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'published'
};

const productValidationResult = productValidator.validate(newProduct); // валідація продукту
if (productValidationResult.isValid) {
  console.log('Product is valid.');
} else {
  console.error('Product validation errors:', productValidationResult.errors);
}

const articleCompositeValidator = new CompositeValidator<Article>([articleValidator]); // використання CompositeValidator для статей
const articleCompositeValidationResult = articleCompositeValidator.validate(newArticle);
if (articleCompositeValidationResult.isValid) {
  console.log('Composite validation for article passed.');
} else {
  console.error('Composite validation errors for article:', articleCompositeValidationResult.errors);
}

const productCompositeValidator = new CompositeValidator<Product>([productValidator]); // використання CompositeValidator для продуктів
const productCompositeValidationResult = productCompositeValidator.validate(newProduct);
if (productCompositeValidationResult.isValid) {
  console.log('Composite validation for product passed.');
} else {
  console.error('Composite validation errors for product:', productCompositeValidationResult.errors);
}

const articleOperations: ContentOperations<Article> = { // операцій з контентом
  create: (content) => content,
  read: (id) => (id === newArticle.id ? newArticle : null),
  update: (id, content) => ({ ...newArticle, ...content }),
  delete: (id) => console.log(`Article with id ${id} deleted.`),
};

const versionedArticle: Versioned<Article> = { // використання версіонування
  ...newArticle,
  version: 1,
  changeLog: [],
  incrementVersion() {
    this.version += 1;
    this.changeLog.push(`Version updated to ${this.version}`);
  }
};

versionedArticle.incrementVersion(); // інкремент версії
console.log('Versioned Article:', versionedArticle);
