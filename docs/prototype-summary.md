---
title: Prototype summary
sidebar_label: Prototype summary
sidebar_position: 1
---

# LRS work history — prototype summary

Clickable prototype of **Unity® Respond** for reporting work activity history across several LRS locations at once (Aha **EAM-507**). It stays in Map and Asset Details. It is sample data on real Edmond, Oklahoma roads — not a production build and not customer data.

Open the live prototype from the partner link. Docs for this page are linked from the top bar.

## How to use it

1. Open **Legend** on the right rail and turn on **LRS Work History**. Collapsing the legend does not change that checkbox.
2. Select route segments. **Select by rectangle** is the default. **Select by polygon** and **Select by line** finish on double-click or Enter; Escape cancels a sketch. Click a line to add or remove it. **Pan** moves the map. **Clear** drops the selection. **Default map view** restores the starting extent and the rectangle tool, and leaves the selection as it is.
3. **Asset Details** (left) lists the selected locations. **Miles** is the measure difference (to − from), not the drawn line length.
4. **Work Activities** lists work orders for every selected location together.
   - Activity type is **Work Order**. Service Request and Inspection are visible and disabled.
   - Dates default to 2024-01-01 through 2026-12-31. Open work is included by its start date. Closed work is included by its finish date.
   - Badges: Equipment Cost, Labor Cost, Material Cost, Total Cost, Cost Per Mile. Total cost is equipment + labor + material. Cost per mile divides that total by the miles of the locations in the Locations scope.
   - The table shows 10 rows by default. Choose 5, 10, 15, 20, or All. Badges and exports use the full filtered set, not only the page on screen.
   - **Columns** chooses table columns (all on by default). The more-actions menu downloads **Export CSV** or **Export Excel**, or **Print**.
5. Drag the bar between Asset Details and the map. Double-click it to restore a 50/50 split. On a narrow window the panes stack.
6. **Base Maps** switches between World Street Map (the default) and OpenStreetMap. Work locations are drawn along the road, including bends. Overlapping measures sit a few pixels apart so each one stays visible and selectable.

## Sample set

Fictional District 3 work orders on Danforth Rd, Broadway, I-35, Covell Rd, 2nd St, and Kelly Ave. Some locations overlap or span others — for example Danforth Rd 140 to 146.5, potholing, in a different period from the segments it covers.
