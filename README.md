# Delivery Tracker — v2

I rebuilt my Delivery Tracker because the original version started hitting real limits.  
The first version used Flask with server-rendered HTML, and as the project grew, managing state became painful. Features started tangling together, and adding new functionality felt harder than it should’ve been.

So I switched gears and rebuilt it properly:  
**React front end + Flask API back end**.

The difference in code quality is massive. The architecture is cleaner, the logic is separated properly, and refactoring has made it easy to add future features without everything collapsing into spaghetti. I’m learning a lot, and I’m enjoying the process.

---

## Why This App Exists

At my job, drivers were skipping their breaks just to keep up with impossible delivery schedules. When I asked management for the break-time data to prove how unrealistic the workload was, they refused to give it to me.

So I built my own system.

Drivers started using it immediately. They helped shape the app by giving feedback, and together we turned it into a tool that actually protects people. Now, when management asks why someone is “slow,” they have real data showing the truth:

- No scheduled breaks  
- Unrealistic delivery windows  
- Excessive workloads  
- Unsafe or inefficient processes  

Drivers feel safer and less stressed because they finally have **proof** — data showing they’re doing their job properly, and that the job itself is the problem.

---

## What v2 Delivers

The new architecture makes the project easier to maintain, expand, and evolve.  
Some of the improvements include:

- Modern React UI  
- Proper, organized API routes  
- Clean state management  
- A structure built for future features

This project is more than an app.  
It’s a tool that gives workers something they never had before:

**A fair way to defend themselves with data.**

[![Watch the video](https://i.ytimg.com/vi/2ZGL23Aeevg/hqdefault.jpg)](https://www.youtube.com/watch?v=2ZGL23Aeevg)




