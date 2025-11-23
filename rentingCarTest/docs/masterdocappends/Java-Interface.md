# Java Interface

## Interface Definition (5-Year-Old)

Imagine a magic toy box that gives animals special powers! An **interface** is like a list of tricks an animal can do, like flying or swimming, but it doesn’t say *how* to do them. For example, a duck can follow the "Flyer" list to fly and the "Swimmer" list to swim. Each animal decides how to do those tricks. The lists make sure every animal with those powers does them the same way, so everyone understands what they can do!

## Interface Definition (Technical)

In Java, an **interface** is a completely abstract type that defines a contract of methods without implementations, used to achieve abstraction and support multiple inheritance. Interface methods are implicitly `public` and `abstract`, and attributes are `public`, `static`, and `final`. Classes implement interfaces using the `implements` keyword, providing concrete implementations for all declared methods. Interfaces cannot be instantiated or contain constructors. They enable code reuse, enforce consistent behavior, and allow classes to implement multiple interfaces, overcoming Java’s single inheritance limitation. Default methods in interfaces (since Java 8) allow adding functionality without breaking existing implementations.

## Example: Flyer and Swimmer Interfaces

Below is an example demonstrating the use of interfaces in Java, where animals implement behaviors like flying and swimming.

```java
// Interface for animals that can fly
interface Flyer {
    void fly();
    void land(); // Landing behavior
    void soar(); // Soaring behavior
}

// Interface for animals that can swim
interface Swimmer {
    void swim();
    void dive(); // Diving behavior
    void floatOnWater(); // Floating behavior
}

// Class representing a Duck, which can both fly and swim
class Duck implements Flyer, Swimmer {
    public void fly() {
        System.out.println("The duck is flying.");
    }

    public void land() {
        System.out.println("The duck is landing.");
    }

    public void soar() {
        System.out.println("The duck is soaring.");
    }

    public void swim() {
        System.out.println("The duck is swimming.");
    }

    public void dive() {
        System.out.println("The duck is diving.");
    }

    public void floatOnWater() {
        System.out.println("The duck is floating on water.");
    }
}

// Class representing an Eagle, which can only fly
class Eagle implements Flyer {
    public void fly() {
        System.out.println("The eagle is flying.");
    }

    public void land() {
        System.out.println("The eagle is landing.");
    }

    public void soar() {
        System.out.println("The eagle is soaring high.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Create and test a Duck
        Duck myDuck = new Duck();
        myDuck.fly();
        myDuck.land();
        myDuck.soar();
        myDuck.swim();
        myDuck.dive();
        myDuck.floatOnWater();

        // Create and test an Eagle
        Eagle myEagle = new Eagle();
        myEagle.fly();
        myEagle.land();
        myEagle.soar();
    }
}
```

### Output

```
The duck is flying.
The duck is landing.
The duck is soaring.
The duck is swimming.
The duck is diving.
The duck is floating on water.
The eagle is flying.
The eagle is landing.
The eagle is soaring high.
```

Explanation

- **Interfaces**: `Flyer` and `Swimmer` define contracts for flying and swimming behaviors, respectively. Each includes three methods: `fly`, `land`, and `soar` for `Flyer`; `swim`, `dive`, and `floatOnWater` for `Swimmer`.
- **Duck Class**: Implements both `Flyer` and `Swimmer`, providing implementations for all methods, demonstrating multiple interface implementation.
- **Eagle Class**: Implements only `Flyer`, as eagles fly but do not swim, showing a single interface implementation.
- **Main Class**: Creates instances of `Duck` and `Eagle`, calling their methods to demonstrate polymorphic behavior.

## Why Use Interfaces?

- **Abstraction**: <mark>Hide implementation details</mark>, exposing only method signatures.
- **Multiple Inheritance**: Allow classes to implement multiple interfaces, unlike single superclass inheritance.
- **Code Reuse**: Promote consistent method definitions across different classes.
- **Flexibility**: <mark>Default methods (since Java 8)</mark> allow adding functionality without breaking existing code.

## References

- [W3Schools: Java Interface](https://www.w3schools.com/java/java_interface.asp)
- [Oracle Java Tutorials: What Is an Interface?](https://docs.oracle.com/javase/tutorial/java/concepts/interface.html)
- [Albert Profe: Java SE Abstract/Interface](https://albertprofe.dev/javase/se-concepts-interface.html)
