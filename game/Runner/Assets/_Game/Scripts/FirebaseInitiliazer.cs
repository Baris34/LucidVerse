using System.Collections;
using UnityEngine;

// Firebase namespace'lerini sadece WebGL olmayan platformlar veya Editör için kullan
#if !UNITY_WEBGL || UNITY_EDITOR
using Firebase;
using Firebase.Extensions;
#endif

public class FirebaseInitializer : MonoBehaviour
{
    public static bool IsFirebaseReady { get; private set; } = false; // Başlangıçta false yapalım

    void Awake()
    {
        // Bu script'in sahnede tek bir kopyasının olmasını sağlayalım (Singleton benzeri)
        // ve sahneler arasında yok olmamasını sağlayalım.
        if (FindObjectsOfType<FirebaseInitializer>().Length > 1)
        {
            Destroy(gameObject);
            return;
        }
        DontDestroyOnLoad(gameObject);

        InitializeFirebase();
    }
    public void FirebaseReadyFromJS(string message)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
    if (message == "true")
    {
        Debug.Log("WebGL: Received Firebase Ready signal from JavaScript.");
        IsFirebaseReady = true;
    }
#endif
    }
    void InitializeFirebase()
    {
#if UNITY_EDITOR
        // Editörde her zaman native Firebase'i başlatmaya çalış (hangi platform seçili olursa olsun test için)
        Debug.Log("Unity Editor: Attempting to initialize Firebase (Native SDK)...");
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task => {
            var dependencyStatus = task.Result;
            if (dependencyStatus == DependencyStatus.Available)
            {
                FirebaseApp app = FirebaseApp.DefaultInstance; // Default instance'ı al
                Debug.Log("Unity Editor: Firebase Native SDK Initialized successfully.");
                IsFirebaseReady = true;
            }
            else
            {
                Debug.LogError($"Unity Editor: Could not resolve all Firebase dependencies: {dependencyStatus}");
                IsFirebaseReady = false;
            }
        });
#elif UNITY_ANDROID || UNITY_IOS
            // Sadece Android ve iOS platformlarında native Firebase'i başlat
            Debug.Log("Native Platform (Android/iOS): Initializing Firebase (Native SDK)...");
            FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task => {
                var dependencyStatus = task.Result;
                if (dependencyStatus == DependencyStatus.Available) {
                    FirebaseApp app = FirebaseApp.DefaultInstance;
                    Debug.Log("Native Platform: Firebase Native SDK Initialized successfully.");
                    IsFirebaseReady = true;
                } else {
                    Debug.LogError($"Native Platform: Could not resolve all Firebase dependencies: {dependencyStatus}");
                    IsFirebaseReady = false;
                }
            });
#elif UNITY_WEBGL
            // WebGL için, başlatmanın index.html'deki JavaScript tarafından yapıldığını varsayıyoruz.
            // Burada IsFirebaseReady flag'ini doğrudan true yapabiliriz,
            // veya JavaScript'ten Unity'ye "Firebase Hazır" mesajı gönderilmesini bekleyebiliriz.
            // Şimdilik, JS tarafının işini yaptığını varsayarak true yapalım.
            // Daha sağlam bir çözüm için JS'den bir callback beklemek daha iyi olabilir.
            Debug.Log("WebGL Platform: Firebase initialization is handled by JavaScript in index.html.");
            IsFirebaseReady = true; // Veya JS'den bir sinyal bekleyin
#else
            Debug.LogWarning("FirebaseInitializer: Unsupported platform. Firebase not initialized.");
            IsFirebaseReady = false;
#endif
    }
}