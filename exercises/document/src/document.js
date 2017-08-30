const CURRENT_DOC_VERSION = 4;

/* eslint no-fallthrough: "off" */
export function Doc(doc = { version: CURRENT_DOC_VERSION, data: {} }) {
  this._loadDocument(doc.version, doc.data);
}

Doc.prototype = {
  _loadDocument(docVersion, data) {
    // TODO: Update document based on version

    let split = (data.name|| ' ').split(' ');

    switch (docVersion) {
      case 1:
        data.firstName = split[0]
        data.lastName = split.length > 1 
        ? split[split.length -1]
        : '';
        data.location = "Earth";
      case 2:
        data.email = "nobody@example.com";
      case 3:
        if (split.length > 2){
          data.middleName = split.slice(1, split.length-1).join(' ');
        } else {

          data.middleName = "";
        };
      case 4:
        break;
      default:
        throw `No spec for this version ${docVersion}`;
    }

    this._data = data;
  },
  get data() {
    return { ...this._data };
  }
};

Doc.fromFile = function fromFile(filename) {
  try {
    let doc = require(`../docs/${filename}`);
    return new Doc(doc);
  } catch (e) {
    let {message} = e;
    if (message && message.indexOf('find') >=0) {
      throw `Cannot find document: ${filename}`;
    } else {
      throw e;
    }
  }
};
