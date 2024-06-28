---
sidebar_position: 2
---

# Move it

> Key concepts: Gestures, gesture handler

## Resources

- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)

## Challenge

This is the second challenge. We’ll want to move slimy across the screen, as shown in the video.

But there are some new things to consider:

→ When we tap him, he blinks. So no more “Open eyes button”.

→ Also, when we move him, he gets scared and closes his eyes. He opens them again when we release him.

<video controls autoplay loop style={{maxHeight: 640, minHeight: 200}}>

  <source src="https://user-images.githubusercontent.com/80724668/187310476-d70ffc08-1752-478b-b28d-761209667654.mov" />
</video>

<details>
<summary>💡 TIPS && HINTS:</summary>

- You’ll need to use a gesture handler.
- You’ll need to combine two gestures, one for the dragging and one for the tapping.
- You’ll need to save the previous position to be able to start from where you left off. Maybe an (x, y) shared value can help.

❔ Questions to consider:

- Is it possible to try to make the timing of the eyes more realistic? How?
</details>
