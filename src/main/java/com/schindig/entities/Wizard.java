package com.schindig.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;

/**
 * Created by Agronis on 12/9/15.
 */
@Entity
public class Wizard {

    @GeneratedValue
    @Id
    public Integer id;

//    @Column(nullable = false)
    public String partyType;

    public ArrayList<String> subType;

    public Wizard(){}
    public Wizard(String partyType, ArrayList<String> subType) {

        this.partyType = partyType;
        this.subType = subType;
    }
    public Integer getId() {

        return id;
    }
    public ArrayList<String> getSubType() {

        return subType;
    }
}
