using System.Runtime.InteropServices;
using UnityEngine;

public class TestScripts : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern int TestFunctionJS(string message);

    void Start()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        int result = TestFunctionJS("Hello from Unity!");
        Debug.Log("Result from TestFunctionJS: " + result);
#endif
    }

    public void ReceiveTestMessage(string message)
    {
        Debug.Log("Message from JS: " + message);
    }
}
