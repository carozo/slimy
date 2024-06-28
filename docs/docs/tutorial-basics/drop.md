---
sidebar_position: 5
---

# Drop

> Key concepts: Communication between UI thread and JS thread

## Resources

### Threads

- [Understanding React Native threads](https://brooklinmyers.medium.com/react-native-understanding-threads-e026c7d62bb2)

But what if I want to run certain processes in one thread, but call them from the other? For example, what if we wanted to set a React State from a gesture handler? Well, take a look at the docs for these two functions:

- [runOnJS](https://docs.swmansion.com/react-native-reanimated/docs/threading/runOnUIJS)

- [runOnUI](https://docs.swmansion.com/react-native-reanimated/docs/threading/runOnUI)

## Challenge

In this challenge we’ll count how many times Slimy has been dropped.

<video controls autoplay loop style={{maxHeight: 640, minHeight: 200}}>

  <source src="https://user-images.githubusercontent.com/80724668/187310893-69f28b75-c18a-4944-a3b8-3d3629536152.mov" />
</video>

<details>
<summary>💡 TIPS && HINTS:</summary>

- Probably we would want to save this in a state.
- You don’t have to change the background color. I did it just to reinforce the concept.

❔ Questions to consider:

- How can you be sure that the counter will increment _after_ the animation ended?
</details>
