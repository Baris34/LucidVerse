using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public TextMeshProUGUI Goldtext;

    public static GameManager instance;
    private int gold;
    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }
    public void AddGold(int amount)
    {
       gold += amount;
       Goldtext.text = gold.ToString();  
    }
    
}
