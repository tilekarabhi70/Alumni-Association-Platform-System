package com.example.project.model;
import jakarta.persistence.*;

	@Entity
	@Table(name = "login_alumni_details")
	public class User {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column
	    private int id;

	    @Column(nullable = false)
	    private String name;

	    @Column(nullable = false, unique = true)
	    private String email;
	    @Column(nullable = false)
	    private Double mobile;
	    
	    @Column(nullable = false)
	    private String batch;
	    

	    @Column(nullable = false)
	    private String password;
	    
       @Transient
	    private String confirmPassword;
//       @Lob
//       @Column(name = "profile_image",nullable = true)
//       private byte[] profileImage;
   //    private String profileImage;
//       @Column
//       private String status;
	    // No-argument constructor
       @Enumerated(EnumType.STRING)
       private Role role;  //
	    public User() {
	    }

	    // All-argument constructor
	    public User(int id, String name, String email,String batch, String password,String confirmPassword,Double mobile,Role role) {
	        this.id = id;
	        this.name = name;
	        this.email = email;
	        this.mobile=mobile;
	        this.batch=batch;
	        this.password = password;
	        this.confirmPassword=confirmPassword;
	    // this.setProfileImage(profileImage);
//	        this.status=status;
	        this.role=role;
	    }

	    // Getter for id
	    public int getId() {
	        return id;
	    }

	    // Setter for id
	    public void setId(int id) {
	        this.id = id;
	    }

	    // Getter for name
	    public String getName() {
	        return name;
	    }

	    // Setter for name
	    public void setName(String name) {
	        this.name = name;
	    }

	    // Getter for email
	    public String getEmail() {
	        return email;
	    }

	    // Setter for email
	    public void setEmail(String email) {
	        this.email = email;
	    }
	    public Double getMobile() {
	    	return mobile;
	    }
	    public void setMobile(double mobile) {
	    	this.mobile=mobile;
	    }
	    public String getBatch() {
	    	return batch;
	    }
	    public void setBatch(String batch) {
	    	this.batch=batch;
	    }

	    // Getter for password
	    public String getPassword() {
	        return password;
	    }

	    // Setter for password
	    public void setPassword(String password) {
	        this.password = password;
	    }
	    public String getConfirmPassword() {
	    	return confirmPassword;
	    }
	    
	    // Setter for password
	    public void setConfirmPassword(String confirmPassword) {
	        this.confirmPassword = confirmPassword;
	    }
	    public Role getRole() {
	        return role;
	    }

	    public void setRole(Role role) {
	        this.role = role;
	    }

//	    public byte[] getProfileImage() {
//	        return profileImage;
//	    }
//
//	    public void setProfileImage(byte[] profileImage) {
//	        this.profileImage = profileImage;
//	    }
//	    public String getStatus() {
//	        return status;
//	    }
//
//	    // Setter
//	    public void setStatus(String status) {
//	        this.status = status;
//	    }

		@Override
		public String toString() {
			return "User [id=" + id + ", name=" + name + ", email=" + email + ", mobile=" + mobile + ", batch=" + batch
					+ ", password=" + password + ", confirmPassword=" + confirmPassword + "]";
		}

//		public String getProfileImage() {
//			return profileImage;
//		}

//		public void setProfileImage(String profileImage) {
//			this.profileImage = profileImage;
//		}

//		public void setProfileImage(String profileImagePath) {
//			// TODO Auto-generated method stub
//			this.profileImage=profileImagePath;
//			
//		}

		}


		

	    
	


