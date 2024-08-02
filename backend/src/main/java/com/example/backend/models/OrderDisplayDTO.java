// package com.example.backend.models;

// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// import java.util.List;

// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// public class OrderDisplayDTO {
//     private Long orderId;
//     private String restName;
//     private double orderTotal;
//     private List<OrderItemDTO> items;


// }
package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDisplayDTO {
    private Long orderId;
    private String restName;
    private float orderTotal;
    private List<OrderItemDTO> items;
    private CustomerDTO customer;
    // Added customer location
    private Long delivery_id;
    private String status;
    private String location;
    private Long custPhone;
    private String rest_addr;
    public OrderDisplayDTO(Long orderId,String restName,float ordertotal,List<OrderItemDTO> item){
        this.orderId=orderId;
        this.restName=restName;
        this.orderTotal=ordertotal;
        this.items=item;
    }

}
