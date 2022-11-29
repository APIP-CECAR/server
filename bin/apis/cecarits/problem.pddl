(define (problem sequencing-critical-thinking)
       (:domain critical-thinking-reasoning)
(:objects 
       student1 student2 student3
       student4 student5 student6 
       student7 student8 student9
       student10 student11 student12
       student13 student14 student15 -student  
       step1 step2 step3 step4 
       step5 step6 step7 step8  
       step9 step10 step11 step12
       step13 step14 step15 step16 - step
       dim-observation dim-comparison dim-classification dim-description -dimension       
)
(:init  
       (student-evidences-step student1 step1)
       (student-evidences-step student2 step1)
       (student-evidences-step student3 step1)
       (student-evidences-step student4 step1)       
       (student-evidences-step student5 step1)
       (student-evidences-step student6 step1)
       (student-evidences-step student7 step1)
       (student-evidences-step student8 step1)       
       (student-evidences-step student9 step1)
       (student-evidences-step student10 step1)
       (student-evidences-step student11 step1)
       (student-evidences-step student12 step1)       
       (student-evidences-step student13 step1)
       (student-evidences-step student14 step1)
       (student-evidences-step student15 step1)
 
       (= (time-required-lo-link lo11 lo12) 5)
       (= (time-required-lo-link lo12 lo14) 10)
       (= (time-required-lo-link lo12 lo13) 5)
       (= (time-required-lo-link lo11 lo13) 5)
       (= (time-required-lo-link lo13 lo14) 5)

       (= (reward-lo-link lo11 lo12) 10)
       (= (reward-lo-link lo11 lo13) 10)
       (= (reward-lo-link lo12 lo13) 10)
       (= (reward-lo-link lo12 lo14) 20)
       (= (reward-lo-link lo13 lo14) 20)

       (= (reward-lo-link lo12 lo21) 15)
       (= (reward-lo-link lo13 lo22) 15)
       (= (reward-lo-link lo14 lo24) 15)

       (= (reward-lo-link lo21 lo22) 10)
       (= (reward-lo-link lo22 lo23) 10)
       (= (reward-lo-link lo22 lo24) 20)
       (= (reward-lo-link lo23 lo24) 20)

       (= (reward-lo-link lo22 lo31) 15)
       (= (reward-lo-link lo23 lo32) 15)
       (= (reward-lo-link lo24 lo34) 15)

       (= (reward-lo-link lo31 lo22) 10)
       (= (reward-lo-link lo32 lo33) 10)
       (= (reward-lo-link lo32 lo33) 10)
       (= (reward-lo-link lo33 lo34) 20)
       
       (= (learning-path-time) 0)
       (= (learning-path-reward)  0)  
)
(:goal
       (and (student-evidences-step student1 step16)
            (student-evidences-step student2 step16)
            (student-evidences-step student3 step16)
            (student-evidences-step student4 step16)
            (student-evidences-step student5 step16)
            (student-evidences-step student6 step16)
            (student-evidences-step student7 step16)
            (student-evidences-step student8 step16)
            (student-evidences-step student9 step16)
            (student-evidences-step student10 step16)
            (student-evidences-step student11 step16)
            (student-evidences-step student12 step16)
            (student-evidences-step student13 step16)
            (student-evidences-step student14 step16)
            (student-evidences-step student15 step16)        
       )  
) 
(:metric maximize (learning-path-reward))

)