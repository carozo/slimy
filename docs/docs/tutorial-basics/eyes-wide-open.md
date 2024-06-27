---
sidebar_position: 1
---

# Eyes wide open

> Key concepts: Shared values, interpolation.

## Resources

Here you'll find all the information you'll need to complete the challenge, fresh from the Reanimated docs.

- [Shared Values](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue)
- [Interpolate](https://docs.swmansion.com/react-native-reanimated/docs/utilities/interpolate)

## Challenge

As a first challenge, we’ll make Slimy open its eyes!

<video controls autoplay loop style={{maxHeight: 640, minHeight: 200}}>

  <source src="https://user-images.githubusercontent.com/80724668/187310363-723a6ce0-512a-418c-8902-fcde84afd69b.mov" />
</video>

💡 TIPS && HINTS:

- The eyes are just a circular view (i added the shine for the sake of looks, but it is not really necessary), and you’ll need to _animate its style._
- Remember that anything that can be normally found on a stylesheet can be animated.
- You will have to consider using a sharedValue for the “state” of the eyes. Remember that, in animations, a shared value is similar to a useState.
- You will need to use one of the animation helpers (e.g with Spring).

❔ Questions to consider:

- How can you animate the style of a view to look like it is an eye opening or closing?
