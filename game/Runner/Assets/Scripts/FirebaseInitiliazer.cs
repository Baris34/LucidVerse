using System.Collections;
using UnityEngine;
using Firebase;
using Firebase.Extensions;

public class FirebaseInitializer : MonoBehaviour
{
    public static bool IsFirebaseReady = false;

    void Awake()
    {
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task =>
        {
            var dependencyStatus = task.Result;
            if (dependencyStatus == DependencyStatus.Available)
            {
                Debug.Log("Firebase Bağlandı");
                IsFirebaseReady = true;
            }
            else
            {
                Debug.LogError($"Firebase Hatası: {dependencyStatus}");
            }
        });
    }
}