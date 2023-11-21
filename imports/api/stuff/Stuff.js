import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class StuffsCollection {
  constructor() {
    this.name = 'StuffsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      name: String,
      quantity: Number,
      owner: String,
      condition: {
        type: String,
        allowedValues: ['excellent', 'good', 'fair', 'poor'],
        defaultValue: 'good',
      },
    });
    this.collection.attachSchema(this.schema);
    
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Stuffs = new StuffsCollection();
