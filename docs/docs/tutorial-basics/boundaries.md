---
sidebar_position: 3
---

# Boundaries

> Key concepts: Clamping, animations (handlers)

## Resources

- [Clamp](https://docs.swmansion.com/react-native-reanimated/docs/utilities/clamp/)

## Challenge

→ We need to keep him inside the screen boundaries.

→ We want to drop him and make him bounce on the ground.

<video controls autoplay loop style={{maxHeight: 640, minHeight: 200}}>

  <source src="https://user-images.githubusercontent.com/80724668/187310576-f6cf041b-3428-4989-94b2-c34346e66945.mov" />
</video>

<details>
<summary>💡 TIPS && HINTS:</summary>

- You already have the gesture handler you need for this, consider using callbacks.
- The library provides us a [clamp](https://docs.swmansion.com/react-native-reanimated/docs/utilities/clamp) function to bound the movement.
- You can explore the `withTiming` config for the bouncing.

</details>
