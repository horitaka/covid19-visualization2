class Firebase {
  constructor() {
    const admin = require('firebase-admin');
    const functions = require('firebase-functions');
    admin.initializeApp(functions.config().firebase);

    this.db = admin.firestore();
    this.firebase = null
    this.fireBaseFieldValue = admin.firestore.FieldValue;
  }

  static getInstance() {
    if (!this.firabese) {
      this.firebase = new Firebase()
    }
    return this.firebase
  }

  async loadAllData(path, queryList=[]) {
    const collectionRef = await this.db.collection(path)

    let queryRef = collectionRef
    if (queryList) {
      queryList.forEach(query => {
        queryRef = queryRef.where(query.key, query.operand, query.condition)
      })
    }
    // const documents = await this.db.collection(path).get()
    const documents = await queryRef.get()
      .then((snapshot) => {
        let tmpDocument = {}
        snapshot.forEach((doc) => {
          tmpDocument[doc.id] = doc.data()
        });
        return tmpDocument
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

      return documents
  }

  async loadAllDataWithoutID(path, filter='') {
    const dataWithID = await this.loadAllData(path, filter)
    if (!dataWithID) {
      return []
    }

    const ids = Object.keys(dataWithID)
    const dataWithoutID = ids.map(id => {
      return dataWithID[id]
    })
    return dataWithoutID
  }

  async loadData(path, documentID, queryList=[]) {
    const collectionRef = await this.db.collection(path)

    let queryRef = collectionRef
    if (queryList) {
      queryList.forEach(query => {
        queryRef = queryRef.where(query.key, query.operand, query.condition)
      })
    }

    const document = await queryRef.doc(documentID).get()
      .then((doc) => {
        return doc.data()
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

      return document
  }

  async storeData(path, documentID, data) {
    const dataWithTimestamp = Object.assign({}, data, {lastUpdatedAt: this.fireBaseFieldValue.serverTimestamp()})
    const fullPath = `${path}/${documentID}`
    const docRef = this.db.doc(fullPath);
    await docRef.set(dataWithTimestamp)
  }

  async storeData2(path, documentID, data) {
    const docRef = this.db.collection(path).doc(documentID);

    await docRef.set({
      data: data
    })
  }

}

module.exports = new Firebase()
