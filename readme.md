# About

User script for keyboard navigation using vim-like keybindings inspired by shift-arrow browse mode in old versions of Opera.
 
#  Principle of operation: 
All urls on the page are indexed using getBoundingClientRect, which gives the 
  link's coordinates on the page as rendered. We use this information to navigate
  between links in a two-dimensional space. 
 
-  TODO: generate some lattice data structure for browsing nearest link in two
  dimensions.
 
-  TODO: enable link clicking with enter key
-  TODO: try to disable for hidden iframes
-  TODO: develop some heuristic so we don't get lost amonst hidden or 
  	irrelevant links.
