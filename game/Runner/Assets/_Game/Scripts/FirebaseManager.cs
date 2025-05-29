// FirebaseManager.cs
using UnityEngine;
using System.Runtime.InteropServices;

public class FirebaseManager : MonoBehaviour
{
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void FirestoreSetDocument(string collectionPath, string documentId, string jsonData, string gameObjectName, string successCallback, string errorCallback);

    [DllImport("__Internal")]
    private static extern void FirestoreGetDocument(string collectionPath, string documentId, string gameObjectName, string successCallback, string errorCallback);
#endif

    [System.Serializable]
    public class PlayerData { public string playerName; public int score; public bool isActive; }

    // ... (Start metodu, isterseniz Debug.Log ekleyebilirsiniz) ...

    public void SavePlayerData(string playerId, PlayerData data)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        string jsonData = JsonUtility.ToJson(data);
        // Bu script'in baðlý olduðu GameObject'in adý ve callback metodlarý
        FirestoreSetDocument("players", playerId, jsonData, gameObject.name, "OnSaveSuccess", "OnSaveError");
#elif !UNITY_WEBGL || UNITY_EDITOR // Native veya Editör için (eðer native Firebase kodunuz varsa)
        Debug.LogWarning("Native Firebase SavePlayerData not implemented in this example.");
        // Native Firebase SDK'sý ile kaydetme kodunuz buraya gelirdi
#endif
    }

    public void LoadPlayerData(string playerId)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        // Bu script'in baðlý olduðu GameObject'in adý ve callback metodlarý
        FirestoreGetDocument("players", playerId, gameObject.name, "OnLoadSuccess", "OnLoadError");
#elif !UNITY_WEBGL || UNITY_EDITOR // Native veya Editör için
        Debug.LogWarning("Native Firebase LoadPlayerData not implemented in this example.");
        // Native Firebase SDK'sý ile yükleme kodunuz buraya gelirdi
#endif
    }

    // JS'den çaðrýlacak callback metodlarý
    public void OnSaveSuccess(string message) { Debug.Log("FirebaseManager Save Success: " + message); }
    public void OnSaveError(string errorMessage) { Debug.LogError("FirebaseManager Save Error: " + errorMessage); }
    public void OnLoadSuccess(string jsonData)
    {
        Debug.Log("FirebaseManager Load Success Data: " + jsonData);
        PlayerData loadedData = JsonUtility.FromJson<PlayerData>(jsonData);
        if (loadedData != null)
        {
            Debug.Log("Player Name: " + loadedData.playerName + ", Score: " + loadedData.score);
        }
    }
    public void OnLoadError(string errorMessage) { Debug.LogError("FirebaseManager Load Error: " + errorMessage); }
}