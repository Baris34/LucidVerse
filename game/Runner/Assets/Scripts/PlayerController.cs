using System;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed;
    private Vector2 startPosition;
    private Vector2 endPosition;
    [SerializeField] private float swipeThreshold;
    [SerializeField] private Animator animator;
    [SerializeField] private CharacterController cc;
    private Vector3 destination;
    private void Update()
    {
       cc.Move(destination);
       destination = Vector3.zero;
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);

            switch (touch.phase)
            {
                case TouchPhase.Began:
                    startPosition = touch.position;
                    break;
                case TouchPhase.Ended:
                    endPosition = touch.position;
                    DetectSwipe();
                    break;
            }
        }
    }

    public void DetectSwipe()
    {
        Vector2 swipe = endPosition - startPosition;

        if (swipe.magnitude > swipeThreshold)
        {
            float x = swipe.x;
            float y = swipe.y;

            if (Math.Abs(x) > Math.Abs(y))
            {
                if (x > 0)
                {
                    //Turn  Right
                    Debug.Log("Swipe Right");
                    SwipeRight();
                }
                else
                {
                    //Turn Left
                    Debug.Log("Swipe Left");
                    SwipeLeft();
                }
            }
            else
            {
                if (y > 0)
                {
                    //Jump
                    Debug.Log("Swipe Up");
                    SwipeUp();
                }
                else
                {
                    //Down
                    Debug.Log("Swipe Down");
                    SwipeDown();
                }
            }
        }
    }
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Gold"))
        {
            Destroy(other.gameObject);
            GameManager.instance.AddGold(1);
        }
    }
    private void OnAnimatorMove()
    {
        if (cc.isGrounded)
        {
            destination += animator.deltaPosition;
        }
        else
        {
            Vector3 forward = transform.forward * speed * Time.deltaTime;
            forward.y = animator.deltaPosition.y ;
            destination += forward;
        }
    }

    public void SwipeRight()
    {
       transform.Rotate(0,90f,0);
    }

    public void SwipeLeft()
    {
        transform.Rotate(0,-90f,0);
    }

    public void SwipeUp()
    {
        animator.SetTrigger("Jumping");
        cc.height = 1.3f;
        cc.center = new Vector3(0,3.3f,0);
    }

    public void SwipeDown()
    {
        animator.SetTrigger("Sliding");
        cc.height = 1.3f;
        cc.center = new Vector3(0, 1f, 0);
    }
    public void SlideAnimationEnd()
    {
        cc.center = new Vector3(0, 1.86f, 0);
        cc.height = 3.39f;
    }
    public void JumpAnimationEnd(){
        cc.center = new Vector3(0, 1.86f, 0);
        cc.height = 3.39f;   
    }
}
