using UnityEngine;
using Firebase.Firestore;
using Firebase.Extensions;
using System.Collections;
using UnityEngine.SceneManagement;
using System.Linq;

public class ThemeManager : MonoBehaviour
{
    FirebaseFirestore db;

    IEnumerator Start()
    {
        // Firebase hazır olana kadar bekle
        yield return new WaitUntil(() => FirebaseInitializer.IsFirebaseReady);

        db = FirebaseFirestore.DefaultInstance;
        LoadLatestThemeAndSwitchScene();
    }

    void LoadLatestThemeAndSwitchScene()
{
    db.Collection("dreams")
        .OrderByDescending("created_at")
        .Limit(1)
        .GetSnapshotAsync()
        .ContinueWithOnMainThread((System.Threading.Tasks.Task<QuerySnapshot> task) =>
        {
            if (task.IsFaulted)
            {
                Debug.LogError("Firestore sorgusu başarısız: " + task.Exception);
                return;
            }

            var snapshot = task.Result;
            if (snapshot.Count > 0)
            {
                var doc = snapshot.Documents.First();
                if (doc != null && doc.TryGetValue<string>("theme", out var theme))
                {
                    Debug.Log("Tema (en son belge): " + theme);
                    SwitchSceneByTheme(theme);
                }
                else
                {
                    Debug.LogWarning("currentTheme alanı yok veya belge null.");
                }
            }
            else
            {
                Debug.LogWarning("Hiç belge bulunamadı.");
            }
        });


}



    void SwitchSceneByTheme(string theme)
    {
        switch (theme.ToLower())
        {
            case "fear":
                SceneManager.LoadScene("Game");
                break;
            case "love":
                SceneManager.LoadScene("Love");
                break;
            default:
                SceneManager.LoadScene("TempScene");
                break;
        }
    }
}