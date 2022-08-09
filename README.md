# FlipRNTest

First of all, I would like to thank to Recruiter and Reviewer for giving me this opportunity.

## Task
The test can be found at https://gist.github.com/abdullahizzuddiin/fe24e15c15fd881ced0b50e394aaa334

Create a Flip Transaction Application that consist of two pages: Transaction List Page and Detail Page. Mockup for all pages is attached below.

### Transaction List Page

- [x] it has list of transactions
- [x] it can be searched or filtered by
- - [x] name
- - [x] sender bank
- - [x] beneficiary bank
- - [x] transaction's amount
- [x] it can be sorted by
- - [x] name A-Z
- - [x] name Z-A
- - [x] date newest
- - [x] date oldest

### Detail Page

App navigated to Detail Page when transaction row on Transaction List Page is pressed.

- [x] it has all informations about the selected transaction
- [x] it has a back button


## Note (Performance Optimization)

In order to get better performance, some optimization approachs are used.

### Use FlatList to render array of items

Common way to render a list of items in react native is to use a ScrollView. It is fine to use ScrollView to render small number of items, but it can lead to performance problems once that array grows large. So I use FlatList, because it lazy loads the list items as they appear on the screen

### Minimize External Libs

The app size will increase greatly if I use too many third-party libraries.

### Avoid Navigation Problems using React Navigation

Ever since the launch of React Native, its core development team had to experiment a lot on navigation to remove inconsistencies between JS and native thread bridge overlay. There were multiple React Native performance issues associated with navigation that needed optimization. 

So i use React Navigation which boasts of a customizable JS re-implementation of the native views.

### Use Uncontrolled Input Field

The value of the uncontrolled input field is handled by the DOM so it can reduces rerender on react native sides.

### Using Memoization

When props within a React functional component change, the whole component rerenders by default. To put it in another way, if a value inside the component changes, the entire component will rerender, along with all the functions or components whose values or props haven’t changed.

This will result in a performance pitfall, which can be avoided with memoization.
