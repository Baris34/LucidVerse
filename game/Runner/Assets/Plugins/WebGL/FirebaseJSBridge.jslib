mergeInto(LibraryManager.library, {
  TestFunctionJS: function(messagePtr) {
    var message = UTF8ToString(messagePtr);
    console.log("TestFunctionJS called with: " + message);
    alert("TestFunctionJS: " + message); // Tarayıcıda bir alert göstererek çalıştığını teyit et
    // Unity'ye basit bir cevap gönder
    if (typeof unityInstance !== 'undefined' && unityInstance.SendMessage) {
      unityInstance.SendMessage("YourGameObjectWithTestScript", "ReceiveTestMessage", "JS Function Executed!");
    }
    return 42; // Bir değer döndürmesi gerekiyorsa
  },
  WebGL_GetLatestTheme: function(gameObjectNamePtr, successCallbackPtr, errorCallbackPtr) {
    const gameObjectName = UTF8ToString(gameObjectNamePtr);
    const successCallback = UTF8ToString(successCallbackPtr);
    const errorCallback = UTF8ToString(errorCallbackPtr);

    console.log("FirebaseJSBridge: WebGL_GetLatestTheme called for GameObject:", gameObjectName);

    try {
      if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
        const errorMsg = "Firebase or Firestore SDK not initialized/loaded for WebGL_GetLatestTheme.";
        console.error(errorMsg);
        if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
          window.unityInstance.SendMessage(gameObjectName, errorCallback, errorMsg);
        }
        return;
      }

      const db = firebase.firestore();
      db.collection("dreams")
        .orderBy("created_at", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
          // ... (önceki mesajdaki then ve catch bloklarının içeriği) ...
          // Sadece console.log'ları ve unityInstance.SendMessage çağrılarını kontrol edin
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            if (doc.exists && doc.data().theme) {
              const theme = doc.data().theme;
              console.log("FirebaseJSBridge: WebGL Firestore Theme (latest):", theme);
              console.log("FirebaseJSBridge: Sending to Unity -> GameObject:", gameObjectName, "Method:", successCallback, "Message:", theme);
              if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
                console.log("FirebaseJSBridge: Attempting to send message to Unity:", gameObjectName, successCallback, theme);
                window.unityInstance.SendMessage(gameObjectName, successCallback, theme);
              }
            } else { /* ... hata durumu ... */ 
                const warnMsg = "WebGL: 'theme' field not found in WebGL_GetLatestTheme.";
                console.warn(warnMsg);
                if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
                    window.unityInstance.SendMessage(gameObjectName, errorCallback, warnMsg);
                }
            }
          } else { /* ... hata durumu ... */ 
            const warnMsg = "WebGL: No documents found in WebGL_GetLatestTheme.";
            console.warn(warnMsg);
            if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
                window.unityInstance.SendMessage(gameObjectName, errorCallback, warnMsg);
            }
          }
        })
        .catch((error) => { /* ... hata durumu ... */ 
            const errorMsg = "WebGL Firestore Query Error in WebGL_GetLatestTheme: " + error.message;
            console.error(errorMsg);
            if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
                window.unityInstance.SendMessage(gameObjectName, errorCallback, errorMsg);
            }
        });
    } catch (e) { /* ... hata durumu ... */
        const exceptionMsg = "WebGL GetLatestTheme Exception: " + e.message;
        console.error(exceptionMsg);
        if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
            window.unityInstance.SendMessage(gameObjectName, errorCallback, exceptionMsg);
        }
    }
  },
  FirestoreSetDocument: function(collectionPathPtr, documentIdPtr, jsonDataPtr, gameObjectNamePtr, successCallbackPtr, errorCallbackPtr) {
    const collectionPath = UTF8ToString(collectionPathPtr);
    const documentId = UTF8ToString(documentIdPtr);
    const jsonData = UTF8ToString(jsonDataPtr);
    const gameObjectName = UTF8ToString(gameObjectNamePtr);
    const successCallback = UTF8ToString(successCallbackPtr);
    const errorCallback = UTF8ToString(errorCallbackPtr);

    console.log("FirebaseJSBridge: FirestoreSetDocument called:", collectionPath, documentId, jsonData);

    try {
      if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
        const errorMsg = "Firebase or Firestore SDK not initialized/loaded for FirestoreSetDocument.";
        console.error(errorMsg);
        if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
          window.unityInstance.SendMessage(gameObjectName, errorCallback, errorMsg);
        }
        return;
      }
      const dataToSet = JSON.parse(jsonData);
      const db = firebase.firestore();
      db.collection(collectionPath).doc(documentId).set(dataToSet)
        .then(() => {
          console.log("FirebaseJSBridge: Firestore Document Set:", collectionPath + "/" + documentId);
          if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
            window.unityInstance.SendMessage(gameObjectName, successCallback, "DOCUMENT_SET_SUCCESS");
          }
        })
        .catch((error) => {
          const errorMsg = "FirebaseJSBridge: Firestore SetDocument Error: " + error.message;
          console.error(errorMsg);
          if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
            window.unityInstance.SendMessage(gameObjectName, errorCallback, errorMsg);
          }
        });
    } catch (e) {
      const exceptionMsg = "FirebaseJSBridge: Firestore SetDocument Exception: " + e.message;
      console.error(exceptionMsg);
      if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
         window.unityInstance.SendMessage(gameObjectName, errorCallback, exceptionMsg);
       }
    }
  }, // FirestoreSetDocument'tan sonra VİRGÜL

  FirestoreGetDocument: function(collectionPathPtr, documentIdPtr, gameObjectNamePtr, successCallbackPtr, errorCallbackPtr) {
    const collectionPath = UTF8ToString(collectionPathPtr);
    const documentId = UTF8ToString(documentIdPtr);
    const gameObjectName = UTF8ToString(gameObjectNamePtr);
    const successCallback = UTF8ToString(successCallbackPtr);
    const errorCallback = UTF8ToString(errorCallbackPtr);

    console.log("FirebaseJSBridge: FirestoreGetDocument called:", collectionPath, documentId);

    try {
      if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
        const errorMsg = "Firebase or Firestore SDK not initialized/loaded for FirestoreGetDocument.";
        console.error(errorMsg);
        if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
          window.unityInstance.SendMessage(gameObjectName, errorCallback, errorMsg);
        }
        return;
      }
      const db = firebase.firestore();
      db.collection(collectionPath).doc(documentId).get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const dataStr = JSON.stringify(data);
            console.log("FirebaseJSBridge: Firestore Document Get:", dataStr);
            if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
              window.unityInstance.SendMessage(gameObjectName, successCallback, dataStr);
            }
          } else {
            const warnMsg = "WebGL: Document not found in FirestoreGetDocument: " + collectionPath + "/" + documentId;
            console.warn(warnMsg);
            if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
              window.unityInstance.SendMessage(gameObjectName, errorCallback, "DOCUMENT_NOT_FOUND");
            }
          }
        })
        .catch((error) => {
          const errorMsg = "FirebaseJSBridge: Firestore GetDocument Error: " + error.message;
          console.error(errorMsg);
          if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
            window.unityInstance.SendMessage(gameObjectName, errorCallback, errorMsg);
          }
        });
    } catch (e) {
      const exceptionMsg = "FirebaseJSBridge: Firestore GetDocument Exception: " + e.message;
      console.error(exceptionMsg);
      if (typeof window.unityInstance !== 'undefined' && window.unityInstance.SendMessage) {
         window.unityInstance.SendMessage(gameObjectName, errorCallback, exceptionMsg);
       }
    }
  }
});


