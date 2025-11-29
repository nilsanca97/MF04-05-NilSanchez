package org.example.model;

public class MinimalClient {


    private String password;
    private String email;

    public MinimalClient() {
    }

    public MinimalClient(String email, String password) {
        this.password = password;
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "MinimalClient{" +
                "password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
