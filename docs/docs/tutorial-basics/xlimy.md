---
sidebar_position: 4
---

# Xlimy

> Key concepts: SVG animations, animated props

## Resources

- [Animated Props](https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedProps)
- [Interpolate Color](https://docs.swmansion.com/react-native-reanimated/docs/utilities/interpolateColor)

### Animating SVGs

First of all, I recommend you take a look at [how the path of an SVG is constructed](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).

- [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)

## Challenge

This is the fourth challenge. We’re going to add a new gesture (long press), that will turn Slimy into XLimy.

<video controls autoplay loop style={{maxHeight: 640, minHeight: 200}}>

  <source src="https://user-images.githubusercontent.com/80724668/187310792-e7a975b7-553e-46cf-aec5-9f3f54022610.mov" />
</video>

<details>
<summary>💡 TIPS && HINTS:</summary>

- We'll need to animate an SVG. Here is the final arrow:

```
<svg width="150" height="150" viewBox="0 0 15 15" fill="none">
  <path d="M0 15L11 4L3.5 4M11 4L11 11.5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"
    stroke-linejoin="round" />
</svg>
```

- We'll need to interpolate the color to turn XLimy into that hot pink.

❔ Questions to consider:

- For the SVG you'll have to consider two “states”. One of them is the final arrow, but what would the first one be?
</details>
