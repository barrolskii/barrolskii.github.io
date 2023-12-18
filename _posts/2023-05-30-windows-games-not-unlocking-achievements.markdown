---
layout: post
title:  "Windows Games Not Unlocking Achievements Fix"
date:   2023-05-30 12:00:00 +0000
categories: Windows
---

If you’ve recently installed Windows onto your machine with a minimal installer you
might notice that some games can no longer unlock achievements. This is simply due
to a required service being disabled.

## The Fix

To get achievements to pop again you will need to enable the “Connected User Experiences
and Telemetry” service. Here is how to do so:

1. Press Windows key + R
2. Type services.msc and hit enter
![Desktop View](/assets/img/WinAchievements/Step1.png){: .w-75 }

3. Look for the “Connected User Experiences and Telemetry” service
![Step 2](/assets/img/WinAchievements/Step2.png)

4. Activate the service

Your achievements should now unlock in games now!
