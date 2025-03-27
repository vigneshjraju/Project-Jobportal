user.patch("/signup/details/:userId", async (req, res) => {
  try {
      const { userId } = req.params;
      const { phonenumber, age, gender, about, education, experience, skills, companyName, companyType, aboutCompany } = req.body;

      // Find user by ID
      let user1 = await usermodel.findById(userId);
      if (!user1) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update user details based on role
      if (user1.Role === "Jobseeker") {
          await Jobseeker.findByIdAndUpdate(
              userId,
              {
                  $set: {
                      PhoneNumber: phonenumber,
                      Age: age,
                      Gender: gender,
                      About: about,
                      Education: education, // Ensure embedded objects are stored
                      Experience: experience,
                      Skills: skills
                  }
              },
              { new: true }  // Return updated document
          );
      } else if (user1.Role === "Employer") {
          await Employer.findByIdAndUpdate(
              userId,
              {
                  $set: {
                      CompanyName: companyName,
                      CompanyType: companyType,
                      AboutCompany: aboutCompany
                  }
              },
              { new: true }
          );
      }

      res.status(200).json({ message: "User details updated successfully" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
  }
});
