# @ElementCollection: Client/Addresses Example

## **What @ElementCollection Does**

> `@ElementCollection` allows you to store a collection of basic types (String, Integer, etc.) or embeddable objects without creating a separate entity class.

`@ElementCollection` provides a clean, simple way to store multiple addresses per client without the overhead of creating a separate Address entity. It's perfect for basic collections that are tightly coupled to their parent entity.



## **Client Entity Configuration**

```java
@Entity
public class Client {
    @Id
    private String id;
    // ... other fields

    @ElementCollection
    @CollectionTable(name = "client_addresses", joinColumns = @JoinColumn(name = "client_id"))
    @Column(name = "address")
    private List<String> addresses = new ArrayList<>();
}
```

## **Database Structure Created**

### **Main Table: CLIENT**

| ID  | NAME | LASTNAME | EMAIL          | PREMIUM | AGE | PASSWORD |
| --- | ---- | -------- | -------------- | ------- | --- | -------- |
| C1  | John | Doe      | john@email.com | true    | 30  | pass123  |

### **Collection Table: CLIENT_ADDRESSES**

| CLIENT_ID | ADDRESS                 |
| --------- | ----------------------- |
| C1        | 123 Main St, City A     |
| C1        | 456 Work Ave, City B    |
| C1        | 789 Vacation Rd, City C |

## **Key Annotations Explained**

| **Annotation**       | **Purpose**                                | **Example**                               |
| -------------------- | ------------------------------------------ | ----------------------------------------- |
| `@ElementCollection` | Marks field as a collection of basic types | Maps `List<String>` to separate table     |
| `@CollectionTable`   | Defines the collection table name and join | `name = "client_addresses"`               |
| `@JoinColumn`        | Specifies foreign key column               | `name = "client_id"` references Client.id |
| `@Column`            | Names the value column                     | `name = "address"` for the String values  |

## **How It Works**

### **1. Automatic Table Creation**

- JPA creates `CLIENT_ADDRESSES` table automatically
- Foreign key `CLIENT_ID` links to `CLIENT.ID`
- Each address becomes a separate row

### **2. CRUD Operations**

**Create:**

```java
Client client = new Client();
client.getAddresses().add("Home Address");
client.getAddresses().add("Work Address");
clientRepository.save(client); // Saves both client and addresses
```

**Read:**

```java
Client client = clientRepository.findById("C1");
List<String> addresses = client.getAddresses(); // Lazy or eager loaded
```

**Update:**

```java
client.getAddresses().add("New Address");
client.getAddresses().remove("Old Address");
clientRepository.save(client); // Updates collection table
```

**Delete:**

```java
clientRepository.delete(client); // Deletes client AND all addresses
```

## **Benefits vs Separate Entity**

| **Aspect**      | **@ElementCollection**     | **Separate Address Entity**    |
| --------------- | -------------------------- | ------------------------------ |
| **Complexity**  | ✅ Simple - no extra entity | ❌ Requires Address class       |
| **Queries**     | ✅ Automatic joins          | ❌ Manual relationship handling |
| **Lifecycle**   | ✅ Managed with parent      | ❌ Must manage separately       |
| **Flexibility** | ❌ Limited to basic types   | ✅ Can have complex fields      |

## **Fetch Strategies**

```java
@ElementCollection(fetch = FetchType.LAZY)   // Default - loaded on access
@ElementCollection(fetch = FetchType.EAGER)  // Loaded with parent entity
```

## **SQL Generated**

**Insert Client with Addresses:**

```sql
-- Insert parent
INSERT INTO CLIENT (ID, NAME, ...) VALUES ('C1', 'John', ...);

-- Insert addresses
INSERT INTO CLIENT_ADDRESSES (CLIENT_ID, ADDRESS) VALUES ('C1', '123 Main St');
INSERT INTO CLIENT_ADDRESSES (CLIENT_ID, ADDRESS) VALUES ('C1', '456 Work Ave');
```

**Fetch Client with Addresses:**

```sql
SELECT c.*, ca.ADDRESS 
FROM CLIENT c 
LEFT JOIN CLIENT_ADDRESSES ca ON c.ID = ca.CLIENT_ID 
WHERE c.ID = 'C1';
```

## **Best Practices**

✅ **Use @ElementCollection when:**

- Storing simple value collections (String, Integer, etc.)
- Values have no independent lifecycle
- No complex queries needed on collection items

❌ **Don't use @ElementCollection when:**

- Collection items need their own ID
- Complex relationships between collection items
- Need to query collection items independently


