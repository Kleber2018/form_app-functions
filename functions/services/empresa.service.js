var buscaEmpParamsCielo = function(empresaUid, db) {
    return db.collection('empresa_pg').doc(empresaUid).get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return null
      } else {
        // console.log('Empresa data:', doc.data());
        return doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
}


var getEmpresa = function(db, empresaUid) {
  return db.collection('empresa').doc(empresaUid).get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
      return null
    } else {
      // console.log('Empresa data:', doc.data());
      return doc.data();
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
}


module.exports = {
    buscaEmpParamsCielo,
    getEmpresa
}