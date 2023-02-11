package com.backend.backend.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AngularLazyLoadDto {
//    private Object filters;

    private Map<String, List<ColumnFilterDto>> filters = new HashMap<String, List<ColumnFilterDto>>();
    private int first;
    private String globalFilter;
    private int rows;
    private String sortField;
    private int sortOrder;

    public Map<String, List<ColumnFilterDto>> getFilters() {
        return filters;
    }

    public void setFilters(Map<String, List<ColumnFilterDto>> filters) {
        this.filters = filters;
    }

    //    public Object getFilters() {
//        return filters;
//    }
//
//    public void setFilters(Object filters) {
//        this.filters = filters;
//    }

    public int getFirst() {
        return first;
    }

    public void setFirst(int first) {
        this.first = first;
    }

    public String getGlobalFilter() {
        return globalFilter;
    }

    public void setGlobalFilter(String globalFilter) {
        this.globalFilter = globalFilter;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public String getSortField() {
        return sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }
}
