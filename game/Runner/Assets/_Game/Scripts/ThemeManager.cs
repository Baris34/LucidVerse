using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;
using System.Linq;

#if !UNITY_WEBGL || UNITY_EDITOR
using Firebase.Firestore;
using Firebase.Extensions;
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

public class ThemeManager : MonoBehaviour
{
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void WebGL_GetLatestTheme(string gameObjectName, string successCallbackMethodName, string errorCallbackMethodName);
#else
    private FirebaseFirestore db;
#endif

    public static ThemeManager Instance { get; private set; }

    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else if (Instance != this)
        {
            Destroy(gameObject);
            return;
        }
    }

    IEnumerator Start()
    {
        // Hem Native/Editor hem de WebGL için FirebaseInitializer'ın hazır olmasını bekle
        FirebaseInitializer firebaseInitializer = FindObjectOfType<FirebaseInitializer>();
        if (firebaseInitializer == null)
        {
            Debug.LogError("FirebaseInitializer script'i sahnede bulunamadı! Lütfen bir GameObject'e ekleyin.");
            SwitchSceneByTheme("default"); // Hata durumunda varsayılan sahne
            yield break;
        }

        Debug.Log("ThemeManager: Waiting for FirebaseInitializer.IsFirebaseReady...");
        yield return new WaitUntil(() => FirebaseInitializer.IsFirebaseReady);
        Debug.Log("ThemeManager: FirebaseInitializer is ready!");

#if !UNITY_WEBGL || UNITY_EDITOR // Native platformlar ve Editör için
        if (FirebaseInitializer.IsFirebaseReady) // Double check
        {
            db = FirebaseFirestore.DefaultInstance;
            Debug.Log("Native/Editor: Firebase Initialized for ThemeManager. Loading theme...");
            LoadLatestThemeAndSwitchScene_Native();
        }
        else
        {
            Debug.LogError("Native/Editor: Firebase could not be initialized by FirebaseInitializer. Loading default scene.");
            SwitchSceneByTheme("default");
        }
#elif UNITY_WEBGL && !UNITY_EDITOR // Sadece WebGL build'inde çalışacak
        if (FirebaseInitializer.IsFirebaseReady) // JS'den gelen sinyalle bu true olmalı
        {
            Debug.Log("WebGL: Firebase should be ready (via JS). Requesting latest theme from Firebase via JS Bridge.");
            WebGL_GetLatestTheme(gameObject.name, "ReceiveThemeFromJS", "ReceiveThemeErrorFromJS");
        }
        else
        {
             Debug.LogError("WebGL: FirebaseInitializer.IsFirebaseReady is false even after waiting. Check JS to Unity callback for Firebase readiness. Loading default scene.");
             SwitchSceneByTheme("default");
        }
        yield return null; // WebGL için Start bir IEnumerator ise bir şey döndürmeli
#endif
    }

#if !UNITY_WEBGL || UNITY_EDITOR
    void LoadLatestThemeAndSwitchScene_Native()
    {
        if (db == null)
        {
            Debug.LogError("Native/Editor: Firestore instance (db) is null in LoadLatestThemeAndSwitchScene_Native.");
            SwitchSceneByTheme("default");
            return;
        }
        // ... (önceki mesajdaki LoadLatestThemeAndSwitchScene_Native kodunuz aynı kalabilir) ...
        // Sadece Debug.Log'ları netleştirdim
        Debug.Log("Native/Editor: Loading latest theme from Firestore...");
        db.Collection("dreams")
            .OrderByDescending("created_at")
            .Limit(1)
            .GetSnapshotAsync()
            .ContinueWithOnMainThread((System.Threading.Tasks.Task<QuerySnapshot> task) =>
            {
                if (task.IsFaulted || task.IsCanceled)
                {
                    Debug.LogError("Native/Editor: Firestore query failed: " + task.Exception);
                    SwitchSceneByTheme("default");
                    return;
                }
                QuerySnapshot snapshot = task.Result;
                if (snapshot != null && snapshot.Count > 0)
                {
                    DocumentSnapshot doc = snapshot.Documents.FirstOrDefault();
                    if (doc != null && doc.Exists && doc.TryGetValue<string>("theme", out string themeValue))
                    {
                        Debug.Log("Native/Editor: Theme (latest document): " + themeValue);
                        SwitchSceneByTheme(themeValue);
                    }
                    else
                    {
                        Debug.LogWarning("Native/Editor: 'theme' field not found or document is null/empty.");
                        SwitchSceneByTheme("default");
                    }
                }
                else
                {
                    Debug.LogWarning("Native/Editor: No documents found in 'dreams' collection.");
                    SwitchSceneByTheme("default");
                }
            });
    }
#endif

    public void ReceiveThemeFromJS(string receivedTheme)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        Debug.Log("WebGL: Received theme from JS: " + receivedTheme);
        SwitchSceneByTheme(receivedTheme);
#endif
    }

    public void ReceiveThemeErrorFromJS(string errorMessage)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        Debug.LogError("WebGL: Error receiving theme from JS: " + errorMessage);
        SwitchSceneByTheme("default");
#endif
    }

    void SwitchSceneByTheme(string theme)
    {
        // ... (bu metod aynı kalabilir, sahne adlarınızın doğru olduğundan emin olun) ...
        string lowerCaseTheme = "default";
        if (!string.IsNullOrEmpty(theme))
        {
            lowerCaseTheme = theme.ToLower();
        }
        else
        {
            Debug.LogWarning("Theme is null or empty, loading default scene.");
        }

        Debug.Log("Switching scene based on theme: " + lowerCaseTheme);
        switch (lowerCaseTheme)
        {
            case "fear": // Firebase'den gelen "Korku" temasını küçük harfe çevirip eşleştiriyoruz
                SceneManager.LoadScene("Game"); // "fear" yerine "korku" olabilir veya temanıza göre
                break;
            case "love": // Örnek
                SceneManager.LoadScene("Love");
                break;
            default:
                Debug.LogWarning($"Unknown or default theme '{lowerCaseTheme}', loading TempScene.");
                SceneManager.LoadScene("TempScene");
                break;
        }
    }
}