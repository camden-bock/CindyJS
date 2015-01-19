## Boolean Operators

Conditional branching may very much depend on the outcome of a boolean query.
in this section we describe all such types of queries as well as the different ways to process boolean values.

### Infix Operators

#### Testing equality: `‹expr1› == ‹expr2›`

**Description:**
This operator tests whether two expressions evaluate to the same value.
The result of this operator is either `true` or `false`.

------

#### Testing inequality: `‹expr1› != ‹expr2›`

**Description:**
This operator tests whether two expressions do not evaluate to the same value.
The result of this operator is either `true` or `false`.
It is the logical negation of `‹expr1› == ‹expr2›`.

------

#### Greater than: `‹expr1› > ‹expr2›`

**Description:**
This operator tests whether the expression `‹expr1›` is **greater than** the expression `‹expr2›`.
It returns a `‹bool›` value.
The comparison is available only for two situations: If both expressions are **real numbers**, then the order of size is the usual ordering of real numbers.
If both expressions are **strings**, then the order is the lexicographic (dictionary) order.
In all other cases (if the values are not comparable) the value `_?_` is returned.

------

#### Less than: `‹expr1› < ‹expr2›`

**Description:**
This operator is similar to **&gt;** but tests for **less than**.

------

#### Greater than or equal: `‹expr1› >= ‹expr2›`

**Description:**
This operator is similar to **&gt;** but tests for **greater than or equal to**.

------

#### Less than or equal: `‹expr1› <= ‹expr2›`

**Description:**
This operator is similar to **&gt;** but tests for **less than or equal to**.

------

#####  Fuzzy comparisons: `~=`, `~!=`, `~<`, `~>`, `~>=`, `~<=`

**Description:**
CindyScript provides a *fuzzy* variant for each comparison operator.
This Version tests whether the condition is satisfied up to an epsilon bound.
Thus the test `a~==0` tests whether is the variable `a` lies between `+epsilon` and `-epsilon`.
The small value epsilon is set to `0.0000000001`.
This operator is sometimes very useful to circumvent inaccuracies which are unavoidable in purely numerical calculations.

The exact semantics of the exact and the fuzzy operators can be read off from the following diagram.
Here for each operator the picture shows for which region of `b` (marked in red) the operator evaluates to true.

<table align="center" cellspacing="0">
<tbody>
  <tr>
   <td>
    <span class="img">
     <img alt="" border="0" src="http://www.cinderella.de/~juergen/CindyDocu/CindyScript/Comparisons.png" width="250"/>
    </span>
   </td>
  </tr>
  <tr>
   <td class="caption">
    <b>
    </b>
   </td>
  </tr>
</tbody>
</table>

------

#### Logical and: `‹bool1› & ‹bool2›`

**Description:**
Logical **and** of two Boolean values defined by the following truth table:

<table class="wikitable">
<tbody>
  <tr>
   <td class="wikicell">
    <b>
     <code>
      A
     </code>
    </b>
   </td>
   <td class="wikicell">
    <b>
     <code>
      B
     </code>
    </b>
   </td>
   <td class="wikicell">
    <b>
     <code>
      A &amp; B
     </code>
    </b>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
  </tr>
</tbody>
</table>

If one of the two arguments is not a Boolean expression, the operator returns `_?_`.

------

#### Logical or: `‹bool1› % ‹bool2›`

**Description:**
Logical **or** of two Boolean values defined by the following truth table:

<table class="wikitable">
<tbody>
  <tr>
   <td class="wikicell">
    <b>
     <code>
      A
     </code>
    </b>
   </td>
   <td class="wikicell">
    <b>
     <code>
      B
     </code>
    </b>
   </td>
   <td class="wikicell">
    <b>
     <code>
      A % B
     </code>
    </b>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
  </tr>
</tbody>
</table>

If one of the two arguments is not a Boolean expression, the operator returns `_?_`.

------

#### Logical not: `!‹bool›`

**Description:**
Logical **not** of one Boolean value defined by the following truth table:

<table class="wikitable">
<tbody>
  <tr>
   <td class="wikicell">
    <b>
     <code>
      A
     </code>
    </b>
   </td>
   <td class="wikicell" colspan="2">
    <b>
     <code>
      !A
     </code>
    </b>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell" colspan="2">
    <code>
     true
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell" colspan="2">
    <code>
     false
    </code>
   </td>
  </tr>
</tbody>
</table>

If the argument is not a Boolean expression, the operator returns `_?__`.

------

------

### Functional Operators

#### Logical and: `and(‹bool1›,‹bool2›)`

**Description:**
`and(x,y)` is equivalent to `x & y`.

------

#### Logical or: `or(‹bool1›,‹bool2›)`

**Description:**
`or(x,y)` is equivalent to `x % y`.

------

#### Logical not: `not(‹bool›)`

**Description:**
`not(x)` is equivalent to `!x`.

------

#### Logical exclusive or: `xor(‹bool1›,‹bool2›)`

**Description:**
Logical **exclusive or** of two Boolean values defined by the following truth table:

<table class="wikitable">
<tbody>
  <tr>
   <td class="wikicell">
    <b>
     <code>
      A
     </code>
    </b>
   </td>
   <td class="wikicell">
    <b>
     <code>
      B
     </code>
    </b>
   </td>
   <td class="wikicell">
    <b>
     <code>
      xor(A,B)
     </code>
    </b>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
  </tr>
  <tr>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     true
    </code>
   </td>
   <td class="wikicell">
    <code>
     false
    </code>
   </td>
  </tr>
</tbody>
</table>

If one of the two arguments is not a Boolean expression, the operator returns `_?_`.

------

------

### Type Predicates

The following predicates test whether the expression `‹expr›` belongs to a certain class of objects.
The predicates are important in defining functions whose behavior depends on the type of input expressions.
Furthermore, these arguments are very useful for debugging, since they can be used to test assertions on the typing of the values in a program.

------

#### Is an integer: `isinteger(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is an integer.

------

#### Is a real number: `isreal(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is a real number.
Note that integers are also real numbers.

------

#### Is a complex number: `iscomplex(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is a complex number.
Note that real numbers are also complex numbers.

------

#### Is even: `iseven(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is an even integer.

------

#### Is odd: `isodd(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is an odd integer.

------

#### Is a list: `islist(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is a list.

------

#### Is a matrix: `ismatrix(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` has the shape of a matrix.
This means that the entries of the list are themselves lists, all of equal length.
If there are *n* entries each of length *m* the expression represents an *n* × *m* matrix.

------

#### Is a number vector: `isnumbervector(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is a list all of whose entries are numbers (integer, real, or complex).

------

#### Is a number matrix: `isnumbermatrix(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is a matrix all of whose entries are numbers (integer, real, or complex).

------

#### Is a string: `isstring(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` is a string.

------

#### Is a geometric element: `isgeometric(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a geometric element.

------

#### Is selected: `isselected(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a geometric element and is selected.
For a geometric element you can also use the .selected property to check this.

------

#### Is a point: `ispoint(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a geometric point.

------

#### Is a line: `isline(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a geometric line.

------

#### Is a circle: `iscircle(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a geometric circle.

------

#### Is a conic: `isconic(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a geometric conic.

------

#### Is a mass: `ismass(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a [CindyLab](CindyLab) mass.

------

#### Is a sun: `issun(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a [CindyLab](CindyLab) sun.

------

#### Is a spring: `isspring(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` represents a [CindyLab](CindyLab) spring.

------

#### Is undefined: `isundefined(‹expr›)`

**Description:**
This operator tests whether the expression `‹expr›` returns an undefined element (`_?_`).